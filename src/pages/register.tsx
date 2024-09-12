import { FormEvent, useState } from 'react';
import InputGroup from '../components/inputGroup';
import { validation } from '../utils/validation';
import Button from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { ALERT_TYPE, ROUTES } from '../utils/constants';
import { AuthenticationApi } from '../api/authentication';
import { alertActions } from '../slices/alertSlice';
import { useDispatch } from 'react-redux';

function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({ email: false, password: false });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const newFormError = {
      email: validation.checkText(form.email),
      password: validation.checkText(form.password),
    };

    setFormError(newFormError);

    const hasErrors = validation.checkErrors(newFormError);

    if (!hasErrors) {
      await AuthenticationApi.register({
        data: form,
        cb: () => {
          dispatch(
            alertActions.handleMessage({
              type: ALERT_TYPE.SUCCESS,
              message: 'Welcome!',
            })
          );

          navigate(ROUTES.SHOP);
        },
        cbError: () => {
          dispatch(
            alertActions.handleMessage({
              type: ALERT_TYPE.ERROR,
              message: 'Register is unavailable',
            })
          );
        },
      });
    }
  }

  return (
    <div className="w-full h-full border border-red-500 flex items-center justify-center">
      <section>
        <h1 className="text-3xl text-center mb-5">Register</h1>
        <form onSubmit={onSubmit} className="w-96 flex flex-col gap-5">
          <InputGroup
            labelName="Email"
            type="text"
            value={form.email}
            isError={formError.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <InputGroup
            labelName="Password"
            type="password"
            value={form.password}
            isError={formError.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <p className="text-xs">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-blue-500">
              Login
            </Link>
          </p>

          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
}

export default Register;
