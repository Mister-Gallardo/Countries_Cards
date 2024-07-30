export async function fetchCountriesList() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,name,capital,flag,flags"
      );
      setCountriesList(data);
    } catch (e: any) {
      setCountriesList(null);
      console.log(`Ошибка: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }