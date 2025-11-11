const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    console.log(data); // Output the fetched data
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};
//In this example, fetchData is an asynchronous function that fetches data from a placeholder API. It uses await to pause execution until the fetch and JSON conversion are complete, ensuring that data is logged only after it has been successfully retrieved.

fetchData();