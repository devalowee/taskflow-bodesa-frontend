import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {

  return (
    <section className="flex w-full h-screen">
      <picture className="w-[65%] h-full">
        <img src="/images/login-bg.webp" alt="login-bg" className="w-full h-full object-cover object-right" />
      </picture>

      <div className="flex flex-col justify-center items-center w-[35%] p-10">
        <article className="mb-10 w-96">
          <h1 className="text-5xl font-extrabold">TaskFlow</h1>
          <p className="text-sm text-muted-foreground">Bienvenido/a de nuevo, inicia sesión para continuar</p>
        </article>
        <LoginForm />
      </div>
    </section>
  );
};
