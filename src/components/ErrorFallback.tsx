import { removeJWT } from "../JWTManager";
import { ErrorFromValidation, ErrorWithHTML } from "../backend/validation";

export default function ErrorFallback({ error }: { error: Error }) {
  if (error instanceof ErrorWithHTML || error instanceof ErrorFromValidation)
    if (error.status === 401)
      removeJWT()
  return (
    <div className="alert alert-danger alert-dismissible fade show">
      <h4 className="alert-heading"><i className="bi-exclamation-octagon-fill"></i> Oops! Something went wrong.</h4>
      <pre>{error.message}</pre>
      <pre>{error.stack}</pre>
    </div>
  )
}

