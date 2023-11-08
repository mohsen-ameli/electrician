export function EmailTemplate({
  name,
  email,
  tel,
  message,
}: {
  name: string | undefined
  email: string | undefined
  tel: string | undefined
  message: string | undefined
}) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <h2>Phone Number: {tel}</h2>
      <h2>Email Address: {email}</h2>
      <h3>{message}</h3>
    </div>
  )
}
