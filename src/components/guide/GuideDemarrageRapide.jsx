import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  PlusCircle,
  LineChart,
  Bell,
  Settings,
  Shield,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

const GuideDemarrageRapide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      icon: Shield,
      title: "Sécurisez votre compte",
      description: "Commencez par renforcer la sécurité de votre compte",
      tasks: [
        { title: "Vérifiez votre email", completed: true },
        { title: "Choisissez un mot de passe fort", completed: true },
        { title: "Activez la double authentification", link: "/security/2fa" }
      ]
    },
    {
      icon: PlusCircle,
      title: "Ajoutez vos premiers investissements",
      description: "Configurez votre portfolio initial",
      tasks: [
        { title: "Ajoutez votre premier investissement", link: "/add-investment" },
        { title: "Configurez les catégories", link: "/categories" },
        { title: "Importez des données existantes", link: "/import" }
      ]
    },
    {
      icon: Bell,
      title: "Configurez vos alertes",
      description: "Restez informé des mouvements importants",
      tasks: [
        { title: "Alertes de performance", link: "/alerts" },
        { title: "Notifications de marché", link: "/notifications" },
        { title: "Rapports périodiques", link: "/reports" }
      ]
    },
    {
      icon: LineChart,
      title: "Personnalisez votre tableau de bord",
      description: "Adaptez l'interface à vos besoins",
      tasks: [
        { title: "Choisissez vos widgets", link: "/dashboard/customize" },
        { title: "Définissez vos objectifs", link: "/goals" },
        { title: "Créez des vues personnalisées", link: "/views" }
      ]
    }
  ];

  const handleStepComplete = (stepIndex, taskIndex) => {
    const newCompletedSteps = new Set(completedSteps);
    const stepKey = `${stepIndex}-${taskIndex}`;
    newCompletedSteps.add(stepKey);
    setCompletedSteps(newCompletedSteps);
  };

  const isStepCompleted = (stepIndex, taskIndex) => {
    const stepKey = `${stepIndex}-${taskIndex}`;
    return completedSteps.has(stepKey);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Rocket size={32} />
            Guide de Démarrage Rapide
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Bienvenue ! Suivez ces quelques étapes pour commencer à utiliser Portfolio Tracker
          </p>
        </div>

        {/* Progression globale */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        index <= currentStep
                          ? 'bg-[#869D78] border-[#869D78] text-white'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progression</p>
                  <p className="font-bold">{Math.round((completedSteps.size / (steps.length * 3)) * 100)}% complété</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, stepIndex) => (
            <Card 
              key={stepIndex}
              className={`bg-white/90 backdrop-blur-sm border-0 ${
                currentStep === stepIndex ? 'ring-2 ring-[#869D78]' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      currentStep >= stepIndex ? 'bg-[#869D78]/10' : 'bg-gray-100'
                    }`}>
                      <step.icon size={24} className={
                        currentStep >= stepIndex ? 'text-[#869D78]' : 'text-gray-400'
                      } />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {step.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-200">
                    {stepIndex + 1}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {step.tasks.map((task, taskIndex) => (
                    <div 
                      key={taskIndex}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isStepCompleted(stepIndex, taskIndex) || task.completed
                          ? 'bg-green-50'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isStepCompleted(stepIndex, taskIndex) || task.completed ? (
                          <CheckCircle2 size={20} className="text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={
                          isStepCompleted(stepIndex, taskIndex) || task.completed
                            ? 'text-green-700'
                            : 'text-gray-700'
                        }>
                          {task.title}
                        </span>
                      </div>
                      {task.link && !isStepCompleted(stepIndex, taskIndex) && !task.completed && (
                        <button 
                          onClick={() => handleStepComplete(stepIndex, taskIndex)}
                          className="flex items-center gap-1 text-sm text-[#869D78] hover:text-[#6b7e60]"
                        >
                          Commencer
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation entre étapes */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentStep === 0
                ? 'text-gray-400 bg-gray-100'
                : 'text-white bg-[#869D78] hover:bg-[#6b7e60]'
            }`}
          >
            <ChevronLeft size={20} />
            Précédent
          </button>
          <button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentStep === steps.length - 1
                ? 'text-gray-400 bg-gray-100'
                : 'text-white bg-[#869D78] hover:bg-[#6b7e60]'
            }`}
          >
            Suivant
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Resources supplémentaires */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Ressources utiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: PlayCircle,
                  title: "Tutoriels vidéo",
                  description: "Apprenez par l'exemple"
                },
                {
                  icon: BookOpen,
                  title: "Documentation",
                  description: "Guides détaillés"
                },
                {
                  icon: Settings,
                  title: "Support",
                  description: "Besoin d'aide ?"
                }
              ].map((resource, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <resource.icon size={20} className="text-[#869D78]" />
                    </div>
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ne plus afficher */}
        <div className="text-center">
          <button className="text-white/80 text-sm hover:text-white">
            Ne plus afficher ce guide au démarrage
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideDemarrageRapide;