import React from "react";
import OpportunityForm from "../../components/forms/OpportunityForm";

export default function CreateOpportunity() {
  const handleSubmit = (data) => {
    console.log("New Opportunity:", data);
    // TODO: Call backend API to save opportunity
    alert("Opportunity posted successfully!");
  };

  return (
    <div className="text-white">
      <OpportunityForm onSubmit={handleSubmit} />
    </div>
  );
}
