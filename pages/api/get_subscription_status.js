/* eslint-disable import/no-anonymous-default-export */

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const { secret } = req.body;
  if (!secret) {
    res.status(400).json({ message: 'Secret is required' });
    return;
  }
  const { community_id } = req.body;
  if (!community_id) {
    res.status(400).json({ message: 'Community ID is required' });
    return;
  }

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Token ${req.body.secret}`,
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://app.circle.so/api/v1/community_member_subscriptions?community_id=${req.body.community_id}`,
      requestOptions
    );
    const result = await response.json();
    res.status(200).send({ message: 'ok', data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
