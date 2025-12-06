export default function StatusTodos() {
  return (
    <div>
          <div className="row g-4 mt-4">

            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="text-muted mb-3">Objective Of The task</h6>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="text-muted mb-3">Completed %</h6>
                </div>
              </div>
            </div>
        </div>
    </div>
  );    
}