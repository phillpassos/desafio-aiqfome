// Pro caso do desafio, estou apenas enviando as mensagens para o console.
// Este helper serve como wrapper para futuras implementações.
// Em um cenário real, poderiamos enviar para um serviço de logging, salvar em um banco de dados, etc.
// Poderiamos até mesmo utilizar um middleware como o morgan (https://www.npmjs.com/package/morgan).
export default new class LoggerHelper {
    log(message: string) {
        console.log(`[LOG]: ${message}`);
    }
    error(message: string) {
        console.error(`[ERROR]: ${message}`);
    }
}