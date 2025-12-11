import { useState, useEffect } from "react";

export function Profile() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = "sud INPT";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(" https://render.com/docs/web-services#port-binding/Dashboard", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur:", error);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-lg text-slate-400">Chargement...</div>
      </div>
    );
  };
  
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  return (
     <div className="container-fluid vh-100 bg-light">
      <div className="row h-100">

        {/* Content */}
        <main className="col-9 col-lg-10 p-4">

          {/* afiche la date daujourdui */}
          <div className="d-flex gap-3 mb-4">
            <h4 className="mb-0">Date :{new Date().toLocaleDateString()}</h4>
          </div>

          <div className="d-flex gap-3 mb-4">
            <h2 className="mb-0">Mon Profile:</h2>
          </div>

          {/* Bottom Row */}
          <div className="row g-4">

            {/* Big bar chart card */}
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="text-muted mb-3">__Name:Sud1    </h6>


                  <div className="placeholder-glow">
                    
                  </div>
                  <div className="card-body">
                  <h6 className="text-muted mb-3">Email : sud1@gmail.com</h6>
                  

                  <div className="placeholder-glow">
                    
                  </div>
                  </div>
                </div>
              </div>
            </div>

            

          </div>

        </main>
      </div>
    </div>
  );}

