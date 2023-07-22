import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LearningCard from '../components/LearningCard';
import { COLORS } from '../colors';

export default function Learning() {
  const learningPaths = [
    {
      title: '¿Cómo validar mi idea?',
      category: 'Iniciando',
      steps: [
        {
          title: 'Nicho',
          description:
            'Identifica un nicho específico dentro del mercado al que va dirigida tu idea.'
        },
        {
          title: 'Prototipo',
          description:
            'Crea un prototipo de tu producto para obtener feedback temprano.'
        },
        {
          title: 'Mom test',
          description:
            'Realiza entrevistas informales con amigos, familiares u otras personas para validar tu idea.'
        },
        {
          title: 'Análisis',
          description:
            'Realiza un análisis detallado del mercado, competidores y factibilidad de tu idea'
        }
      ]
    },
    {
      title: '¿Cómo desarrollar mi producto?',
      category: 'Desarrollo',
      steps: [
        {
          title: 'Investigación',
          description:
            'Investiga las necesidades y preferencias de tu público objetivo para desarrollar un producto relevante.'
        },
        {
          title: 'Diseño',
          description:
            'Crea un diseño atractivo y funcional que cumpla con las especificaciones y requisitos del producto.'
        },
        {
          title: 'Desarrollo',
          description:
            'Lleva a cabo el desarrollo del producto, asegurándote de cumplir con los estándares de calidad.'
        },
        {
          title: 'Pruebas',
          description:
            'Realiza pruebas exhaustivas para identificar y corregir posibles errores o fallos del producto.'
        }
      ]
    },
    {
      title: '¿Cómo lanzar mi producto al mercado?',
      category: 'Lanzamiento',
      steps: [
        {
          title: 'Estrategia de lanzamiento',
          description:
            'Elabora una estrategia de lanzamiento que incluya la segmentación del mercado, canales de distribución y promoción.'
        },
        {
          title: 'Presupuesto',
          description:
            'Establece un presupuesto para el lanzamiento que cubra los gastos de marketing, producción y distribución.'
        },
        {
          title: 'Promoción',
          description:
            'Promociona tu producto a través de diferentes medios y plataformas para alcanzar a tu audiencia objetivo.'
        },
        {
          title: 'Feedback',
          description:
            'Recopila feedback de los clientes durante el lanzamiento para realizar ajustes y mejoras si es necesario.'
        }
      ]
    }
  ];

  return (
    <>
      <ScrollView contentContainerStyle={styles.container2}>
        {learningPaths.map(path => {
          return (
            <View style={styles.module}>
              <View style={styles.headingContainer}>
                <View style={styles.heading}>
                  <Text style={styles.level}>{path.category}</Text>
                  <Text style={styles.headingText}>{path.title}</Text>
                </View>
              </View>
              <ScrollView
                contentContainerStyle={styles.steps}
                horizontal={true}
              >
                {path?.steps?.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <LearningCard
                      title={step?.title}
                      description={step?.description}
                      step={index + 1}
                      isEven={isEven}
                      key={index}
                    />
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    paddingLeft: 16
  },
  module: {
    paddingTop: 24,
    paddingLeft: 16,
    paddingBottom: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    gap: 16
  },
  steps: {
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: COLORS.primaryBlack
  },
  level: {
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'baseline',
    fontSize: 12
  },
  headingText: {
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 8,
    letterSpacing: '-0.8%'
  }
});
