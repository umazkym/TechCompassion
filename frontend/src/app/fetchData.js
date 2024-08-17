export default async function fetchData() {
    const res = await fetch('http://127.0.0.1:8000/mentor/1/home', { cache: "no-cache" });

    if (!res.ok) {
      throw new Error('Failed to fetch customers');
    }
    return res.json();
  }