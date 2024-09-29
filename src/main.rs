use http::{Method, Request, Response};
use http_body_util::Full;
use hyper::body::{Bytes, Incoming};
use hyper::service::service_fn;
use hyper_util::rt::tokio::{TokioExecutor, TokioIo};
use hyper_util::server::conn::auto::Builder;
use rustls_pemfile::{certs, private_key};
use rustls_pki_types::CertificateDer;
use std::fs;
use std::io::{self, BufReader};
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio_rustls::rustls::ServerConfig;
use tokio_rustls::TlsAcceptor;

async fn service(req: Request<Incoming>) -> io::Result<Response<Full<Bytes>>> {
    match (req.method(), req.uri().path()) {
        (&Method::GET, "/assets/logo.jpeg") => Ok(Response::builder()
            .status(200)
            .body(Full::from(tokio::fs::read("assets/logo.jpeg").await?))
            .unwrap()),
        (&Method::POST, "") => Ok(Response::builder()
            .status(200)
            .body(Full::from(tokio::fs::read("").await?))
            .unwrap()),
        _ => Ok(Response::builder()
            .status(404)
            .body(Full::from(tokio::fs::read("assets/404.html").await?))
            .unwrap()),
    }
}

#[tokio::main]
async fn main() -> io::Result<()> {
    let key = private_key(&mut BufReader::new(fs::File::open("key.pem")?)).unwrap();
    let cert: io::Result<Vec<CertificateDer>> =
        certs(&mut BufReader::new(fs::File::open("cert.pem").unwrap())).collect();
    let mut config = ServerConfig::builder()
        .with_no_client_auth()
        .with_single_cert(cert?, key.unwrap())
        .unwrap();
    config.alpn_protocols = vec![b"h2".to_vec(), b"http/1.1".to_vec(), b"http/1.0".to_vec()];
    let acceptor = TlsAcceptor::from(Arc::new(config));
    let listner = TcpListener::bind("0.0.0.0:4443").await?;
    let service = service_fn(service);
    loop {
        let (stream, _) = listner.accept().await.unwrap();
        let acceptor = acceptor.clone();
        tokio::spawn(async move {
            let stream = acceptor.accept(stream).await.unwrap();
            if let Err(err) = Builder::new(TokioExecutor::new())
                .serve_connection(TokioIo::new(stream), service)
                .await
            {
                eprintln!("{}", err)
            }
        });
    }
}
