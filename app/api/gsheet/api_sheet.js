const getAllPostAsync = async () => {
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
