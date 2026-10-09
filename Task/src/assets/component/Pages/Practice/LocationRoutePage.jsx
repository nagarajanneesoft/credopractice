import { useEffect } from "react";
import { useLocation } from "react-router";

export default function LocationRoutePage() {
  const location = useLocation();
  let url = new URLSearchParams(location.search);

  useEffect(() => {
    console.log("Id====>", url.get("id"));
    console.log("name", url.get("name"));
  }, []);

  return (
    <div>
      <p> Locaiton Route page </p>
    </div>
  );
}
