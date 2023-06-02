import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Header from '../../containers/header';
import LoginForm from '../../containers/login-form';

function Login() {

  const {t} = useTranslate();

  return (
    <PageLayout head={<Header/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm />
    </PageLayout>
  );
}

export default Login;
