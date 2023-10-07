import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import SPACING from '../constants/spacing';
import TYPOGRAPHY from '../constants/typography';

export default function LibraryDetail() {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>Cómo validar mi idea</Text>
          <Text style={styles.description}>
            ¡Conversa con tu público! Antes de sumergirte de lleno, habla con
            posibles clientes. El feedback directo puede revelar aspectos
            cruciales de tu idea que quizás no habías considerado. Una simple
            conversación puede ser la diferencia entre el éxito y el
            estancamiento.
          </Text>
          <Text style={styles.description}>
            Lanza una versión mínima viable (MVP). No esperes a que todo sea
            perfecto; lanza una versión simplificada de tu idea al mercado. Esta
            es la forma más rápida de probar la viabilidad de tu concepto. ¡El
            aprendizaje en tiempo real es invaluable!
          </Text>
          <Text style={styles.description}>
            Monitorea y mide. Usa herramientas analíticas para seguir de cerca
            cómo reacciona tu audiencia a tu idea. Estas métricas te dirán qué
            está funcionando y qué necesita ser mejorado. En el mundo de las
            startups, adaptarse rápidamente es la clave.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryWhite,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    height: '100%'
  },

  title: {
    fontSize: TYPOGRAPHY.extraLargeTitle,
    marginBottom: SPACING.large,
    color: COLORS.primaryBlack
  },

  description: {
    fontSize: TYPOGRAPHY.baseText,
    marginBottom: SPACING.medium,
    color: COLORS.primaryBlack
  }
});
