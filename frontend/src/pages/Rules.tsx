const Rules = () => {
  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">Rules</h2>
      </div>
      <hr />
      <div className="py-2">
        <h3 className="text-xl font-bold">Rules and Regulations</h3>
        <p className="py-2">
          All the participants will abide by the rules.
        </p>
        <h4 className="font-bold">Team Format</h4>
        <ul className="list-disc pl-6">
          <li>A team can have maximum 2 members</li>
          <li> One account per team is provided for submission in the platform as a credential.</li>

          <li>
            Each participant should be a student with valid student identity
            proof
          </li>
          <li>The submission after the deadline will be discarded.</li>
          <li>Winners should submit the model at the end, so they will be responsible for storing the model with the best performance.</li>
          <li>Total submission Quota is 30</li>
        </ul>
        <h3 className="text-xl font-bold pt-4">Terms and Conditions</h3>
        <ul className="list-disc pl-6">
          <li>
            No team members are allowed to use the dataset outside the
            competition.
          </li>
          <li>The team members will be responsible  if they share their private credentials outside of the team or there are unnecessary activities from that team account.</li>
          <li>All taxes imposed on prizes are the winner's sole responsibility. Payments to prospective winners are contingent on submitting all documents needed by the LOCUS in order to comply with applicable state, federal, municipal, and foreign (including provincial) tax reporting and withholding laws. Prizes will be awarded net of any taxes required by law to be withheld by the Competition Sponsor.</li>
          <li>You agree that, unless prohibited by law, the Competition Sponsor, LOCUS, and its affiliates may use your name and likeness for advertising and promotional purposes without extra compensation</li>
          <li>If the Competition is unable to run as planned due to any reason, including infection by computer virus, bugs, tampering, unauthorized intervention, fraud, technical failures, or any other cause that corrupts or affects the administration, 
            security, fairness, integrity, or proper conduct of the Competition, the LOCUS reserves the right to cancel, terminate, modify, or suspend the Competition.</li>
          <li>The LOCUS reserves the right to hold void, suspend, cancel, or amend the Competition where it becomes reasonably necessary to do so.</li>
          <li>If a scenario develops that is not covered by the terms/rules of the competition, the organizing team will have the ability to make a final judgment.</li>
          <li>

            The rights for the code and model will be vested to the dataset
            provider with proper credit to the team members
          </li>
        </ul>
        <p className="py-2">
        Disclaimer: By logging in to the platform, participants agree on rules, terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default Rules;
