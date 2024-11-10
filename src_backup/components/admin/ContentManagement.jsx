
const ContentManagement = ({ isMobile }) => {
  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      <h1 className="text-2xl font-bold mb-4">Gestion du contenu</h1>
      <p>Contenu à venir...</p>
    </div>
  );
};

export default ContentManagement;
