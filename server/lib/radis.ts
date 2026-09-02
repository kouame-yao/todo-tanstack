import { Redis } from 'ioredis'

function getRedisUrl() {
  const url = process.env.REDIS_URL
  if (!url) {
    throw new Error(
      "REDIS_URL n'est pas définie dans les variables d'environnement",
    )
  }
  return url
}

// Version recommandée : utilisez une variable d'environnement
export const redis = new Redis(getRedisUrl(), {
  // Forcer TLS pour Upstash (même si l'URL est en rediss://)
  tls: {
    // Upstash accepte les certificats auto-signés
    rejectUnauthorized: false,
  },
  // Réessayer intelligemment
  retryStrategy: (times) => {
    if (times > 5) {
      // Arrêter de réessayer après 5 tentatives pour éviter la boucle infinie
      return null
    }
    // Attendre de plus en plus longtemps entre les tentatives
    return Math.min(times * 50, 2000)
  },
  maxRetriesPerRequest: 5, // Réduire à 5 au lieu de 20
})

// Ajouter un écouteur d'erreurs pour le débogage
redis.on('error', (error) => {
  console.error('Erreur Redis :', error.message)
})
