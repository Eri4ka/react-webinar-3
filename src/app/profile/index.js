import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Header from '../../containers/header';
import ProfileCard from '../../components/profile-card';
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function Profile() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.profile.data,
    waiting: state.profile.waiting,
  }));

  useInit(() => {
    store.actions.profile.getProfileData();
  }, []);

  const {t} = useTranslate();

  const profileFields = [
    {
      id: 1,
      label: t('profile.firstName'),
      value: select.user?.profile?.name || ''
    },
    {
      id: 2,
      label: t('profile.phone'),
      value: select.user?.profile?.phone || ''
    },
    {
      id: 3,
      label: 'e-mail',
      value: select.user?.email || ''
    }
  ]
  
  return (
    <PageLayout head={<Header/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard title={t('profile.title')} fieldsList={profileFields} />
      </Spinner>
    </PageLayout>
  );
}

export default Profile;
