export const getAllPostAsync = async () => {
    try {
      const response = await fetch(
        '/api/gsheet',
        {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        });
      if(!response.ok) {
        throw "Error " + response.status;
      }
      const result = await response.json();
      setLoading(false)
      setPosts(result.data.values);
    } catch(e) {
      alert("Error " + e);
    }
  }

export const addPostAsync = async() => {
  const response = await fetch(
                'api/gsheet',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
  if(!response.ok) {
      throw "Error " + response.status;
  }
  const result = await response.json();
  alert("Post has been added to sheetrange " + result.data.tableRange);
  return response;
}