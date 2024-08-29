
const downloadQR = async (filename: string, response: {data: Blob}) => {
    try {
      
      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Cleanup
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally{
      window.location.reload()
    }
  };

  export  {downloadQR}