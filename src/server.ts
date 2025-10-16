import dotenv from 'dotenv';
import app from './app';
import prisma from './helpers/prisma';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

async function start() {
	try {
		await prisma.$connect();
		const server = app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));

		const gracefulShutdown = async (signal: string) => {
			server.close(async () => {
				try {
					await prisma.$disconnect();
					process.exit(0);
				} catch (err) {
					process.exit(1);
				}
			});
		};

		process.on('SIGINT', () => gracefulShutdown('SIGINT'));
		process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
	} catch (err) {
		console.error('Failed to start server', err);
		try { await prisma.$disconnect(); } catch (_) {}
		process.exit(1);
	}
}

start();