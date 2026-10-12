import { useEffect } from "react";
import { useParams } from "react-router";

export default function DynamicRoutePage() {
  const params = useParams();

  useEffect(() => {
    console.log("useParams=====>", params);
  }, []);

  return (
    <div>
      <p> Dynamic Route page </p>
    </div>
  );
}
