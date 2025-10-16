import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import jwtHelper from './helpers/jwt.helper';
import loggerHelper from './helpers/logger.helper';

const app = express();

app.use(express.json());

// Watcher de verificação do token JWT
// Como estamos utilizando um micro serviço, o login e validação do token não deveria
// ser responsabilidade desta aplicação.
// Contudo, neste trecho é onde fariamos a verificação através de outro serviço ou banco de dados.
app.use((req, res, next) => {
  // Aqui temos acesso a todos os dados das requisições.
  // Podemos logar, monitorar, etc.
  // Para mais info, vide o helper de logger.
  loggerHelper.log(`Requisição recebida: ${req.method} ${req.path}`);
  req.body && loggerHelper.log(`Payload: ${JSON.stringify(req.body)}`);

  if(req.path.includes('/login')) return next();

  if (!req.headers["authorization"]) return res.status(401).json({message: "Não autorizado"}); // Unauthorized

  const token = req.headers["authorization"].split(" ")[1];
  
  try {
    const decoded = jwtHelper.verifyToken(token);
    if (!decoded) return res.status(403).json({ message: "Token inválido" }); // Forbidden

    return next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
});

app.use('/api', routes);

app.use((err, _, res, __) => {
  loggerHelper.error(err.stack);
  res.status(500).send('');
});

export default app;