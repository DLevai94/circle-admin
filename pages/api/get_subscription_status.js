export default (req, res) => {
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

  let myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${req.body.secret}`);
  myHeaders.append('Content-Type', `application/json`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    `https://app.circle.so/api/v1/community_member_subscriptions?community_id=${req.body.community_id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));

  res.status(200).send({ message: 'ok' });
};
