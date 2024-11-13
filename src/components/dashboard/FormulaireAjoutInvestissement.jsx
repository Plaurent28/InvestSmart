import { Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';

const FormulaireAjoutInvestissement = ({ isMobile }) => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    nom: '',
    montant: '',
    type: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer les données
    console.log({ ...formData, date });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      <h1 className="text-2xl font-bold mb-6">Formulaire d'ajout d'investissement</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitted && (
              <Alert className="mb-6 bg-green-50">
                <AlertDescription className="text-green-600">
                  Investissement ajouté avec succès !
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="nom">Nom de l'investissement</Label>
              <Input
                id="nom"
                name="nom"
                placeholder="Ex: Actions Apple"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="montant">Montant</Label>
              <div className="relative">
                <Input
                  id="montant"
                  name="montant"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.montant}
                  onChange={handleInputChange}
                  required
                  className="pl-8"
                />
                <Euro className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Type d'investissement</Label>
              <Select name="type" onValueChange={handleTypeChange} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actions">Actions</SelectItem>
                  <SelectItem value="obligations">Obligations</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="crypto">Cryptomonnaies</SelectItem>
                  <SelectItem value="autres">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date d'investissement</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(date)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => setDate(newDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description de l'investissement"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Ajouter l'investissement
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaireAjoutInvestissement;