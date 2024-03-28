// Mock data for demonstration
const ids = [
    { id: "123", authorized: true, firstname: "philip", lastname: "b" },
    { id: "456", authorized: false, firstname: "sarah", lastname: "b" }
  ];
  
// pages/api/checkId.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Extract the ID from the request body
      const { id } = req.body;
  
      // Find the ID in your data source
      const item = ids.find(item => item.id === id);
  
      if (item) {
        // If found, return the authorization status
        res.status(200).json({ authorized: item.authorized });
      } else {
        // If not found, handle accordingly (e.g., ID does not exist)
        res.status(404).json({ error: "ID not found" });
      }
    } else {
      // Handle any non-POST requests
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  