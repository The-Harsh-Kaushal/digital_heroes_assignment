import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';
import { createLead } from '../../services/leadService';
import { budgetOptions, leadSchema } from '../../schemas/leadSchema';
import { getApiErrorMessage } from '../../utils/formatters';

export const LeadForm = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await createLead({
        ...values,
        message: values.message || '',
      });
      toast.success('Lead submitted successfully');
      reset();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to submit lead'));
    }
  };

  return (
    <section className="bg-white py-20 sm:py-28" id="lead-form">
      <div className="page-shell grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
            Lead intake
          </p>
          <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">
            Give prospects a fast path to your team.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Collect name, email, budget, and project context with validation
            that keeps bad submissions out of your pipeline.
          </p>
        </div>

        <Card className="p-5 sm:p-8">
          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                autoComplete="name"
                error={errors.name?.message}
                id="name"
                label="Name"
                placeholder="Jane Cooper"
                {...register('name')}
              />
              <Input
                autoComplete="email"
                error={errors.email?.message}
                id="email"
                label="Email"
                placeholder="jane@company.com"
                type="email"
                {...register('email')}
              />
            </div>
            <Select
              error={errors.budget?.message}
              id="budget"
              label="Budget"
              options={budgetOptions}
              placeholder="Select budget range"
              {...register('budget')}
            />
            <Textarea
              error={errors.message?.message}
              id="message"
              label="Message"
              placeholder="Tell us what you want to build..."
              {...register('message')}
            />
            <Button
              className="mt-2"
              fullWidth
              icon={Send}
              isLoading={isSubmitting}
              size="lg"
              type="submit"
            >
              Submit Lead
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
