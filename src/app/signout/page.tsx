import { signOut } from "../../../auth";

export default function HomePage() {
    // redirect("/PatientDashboard"); // Redirects to PatientDashboard
  
    return (
      <div>
        <form
          action={async () => {
            "use server";
  
            await signOut();
          }}
        >
          <button type="submit" className="nav-link w-[300px] ">
            Sign Out
          </button>
        </form>
      </div>
    );
  }