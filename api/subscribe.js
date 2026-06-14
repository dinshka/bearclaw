export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, sport } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email requis' });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: { SPORT: sport },
        listIds: [3],
        updateEnabled: true,
      }),
    });

    if (!response.ok && response.status !== 204) {
      const err = await response.json();
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ success: true });

  } catch (e) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
