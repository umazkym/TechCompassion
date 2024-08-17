export default async function fetchData() {
    const res = await fetch(process.env.API_ENDPOINT + '/mentor/1/home', { cache: "no-cache" });

    if (!res.ok) {
      throw new Error('Failed to fetch customers');
    }
    return res.json();
  }