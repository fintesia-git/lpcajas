// api/enviar-email.js

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nombre, email, mensaje } = req.body;

  // El endpoint secreto se lee desde las variables de entorno
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

  if (!formspreeEndpoint) {
    return res.status(500).json({ message: 'La configuración del servidor es incorrecta.' });
  }

  try {
    // Reenviamos los datos a Formspree usando fetch
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ nombre, email, mensaje }),
    });

    if (response.ok) {
      // Si Formspree responde OK, nosotros también
      return res.status(200).json({ message: 'Mensaje enviado con éxito!' });
    } else {
      // Si Formspree da un error, lo pasamos
      return res.status(response.status).json({ message: 'Error al enviar el mensaje.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Hubo un error en el servidor.' });
  }
}