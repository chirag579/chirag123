import axios from "axios";

export const getEmployees = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/Project",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
console.log(response);
    if (response.data.success) {
      return response.data.employees; 
     
    } else {
      return []; 
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return []; 
  }
};
// Fetch all projects for employee selection
export const getEmployeesProjects = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:4000/api/project/projectList", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      // Return just the projects array
      return response.data.projects || [];
    } else {
      console.error("Failed to fetch projects:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};