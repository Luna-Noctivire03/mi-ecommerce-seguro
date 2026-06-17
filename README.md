
1. ¿Por qué OpenSSL da alerta de "sitio no seguro" y qué soluciona Let's Encrypt?
Cuando openssl genera un certificado localmente, ese certificado es auto firmado, es decir, nosotros mismos lo creamos y lo firmamos. El navegador no lo reconoce como confiable porque no fue validado por ninguna entidad externa reconocida.
Let's Encrypt es una autoridad certificadora (CA) gratuita y reconocida. Los certificados que emite están respaldados por una entidad que los navegadores ya reconocen y confían, por eso el navegador no lanza una alerta. Además se renuevan automáticamente cada 90 días.
2. JWT en SessionStorage vs Sesiones tradicionales en Cookies
Las sesiones tradicionales guardan el estado del usuario en el servidor (en memoria o base de datos). Si tienes 3 servidores, todos deben compartir esa información, lo que complica escalar.
Un JWT en sesión storage es stateless: toda la información del usuario viaja dentro del token. El servidor solo verifica la firma criptográfica, sin consultar ninguna base de datos. Cualquier servidor puede validarlo sin coordinarse con los demás.
la sesión tradicional es como la identificación que el servidor lleva de cada usuario.
3. Impacto en ciberseguridad si Transbank/Shipit operara bajo HTTP
HTTP transmite todo en texto plano y sin cifrado. Si un atacante está en la misma red, puede interceptar y leer toda la comunicación, incluyendo números de tarjetas, tokens de pago y datos personales, lo que se le llama ataque Man-in-the-Middle.
Además, operar bajo HTTP viola el estándar PCI-DSS que exige cifrado en toda transmisión de datos financieros. En Chile también viola la Ley 19.628 de protección de datos personales, lo que puede resultar en multas y pérdida del servicio de pago.
