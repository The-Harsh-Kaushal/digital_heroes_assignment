import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../schemas/loginSchema';
import { getApiErrorMessage } from '../../utils/formatters';

export const AdminLogin = () => {
  const { isAuthenticated, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/admin/home';

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      toast.success('Welcome back');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to sign in'));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="page-shell grid min-h-screen place-items-center py-12">
        <div className="w-full max-w-md">
          <Link
            className="focus-ring mx-auto mb-8 flex w-max items-center gap-3 rounded-full"
            to="/"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 font-black text-white">
              L
            </span>
            <span className="text-lg font-black text-slate-950">LeadDesk</span>
          </Link>
          <Card className="p-6 sm:p-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
                Admin
              </p>
              <h1 className="mt-3 text-3xl font-black text-slate-950">
                Sign in to your dashboard
              </h1>
            </div>
            <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
              <Input
                autoComplete="email"
                error={errors.email?.message}
                icon={Mail}
                id="admin-email"
                label="Email"
                placeholder="admin@company.com"
                type="email"
                {...register('email')}
              />
              <Input
                autoComplete="current-password"
                error={errors.password?.message}
                icon={LockKeyhole}
                id="admin-password"
                label="Password"
                placeholder="Enter password"
                type="password"
                {...register('password')}
              />
              <Button fullWidth isLoading={isSubmitting} size="lg" type="submit">
                Sign In
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
};
