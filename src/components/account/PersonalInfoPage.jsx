
const PersonalInfoPage = ({ isMobile }) => {
  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      <h1 className="text-2xl font-bold mb-4">Informations personnelles</h1>
      <p>Contenu à venir...</p>
    </div>
  );
};

export default PersonalInfoPage;
