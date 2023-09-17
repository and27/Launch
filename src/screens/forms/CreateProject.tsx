import React, { useContext } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable
} from 'react-native';
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { saveProjectInfo } from '../../utils/supabase';
import { Area, Objective, Resource } from '../../enums/projectEnums';
import { StackNavigationProp } from '@react-navigation/stack';

const windowWidth = Dimensions.get('window').width;

export default function CreateProject() {
  const [projectInfo, setProjectInfo] = React.useState<{
    idea?: string;
    name?: string;
    area?: number;
    objective?: number;
    resources?: number;
  }>({});

  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleSaveData = async () => {
    const dataToSend = {
      project_description: projectInfo.idea,
      project_name: projectInfo.name,
      ...projectInfo
    };
    delete dataToSend.name;
    delete dataToSend.idea;

    const { data, error } = await saveProjectInfo(dataToSend);
    if (error) {
      console.log(error);
    } else {
      navigate('Roadmap', projectInfo);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>¿Tienes una idea?</Text>
        <View>
          <Text>Cuéntanos tu idea</Text>
          <TextInput
            style={styles.input}
            placeholder="Idea"
            onChangeText={idea => setProjectInfo({ ...projectInfo, idea })}
          />
          <Text style={styles.label}>Dale un nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={name => setProjectInfo({ ...projectInfo, name })}
          />
          <Text style={styles.label}>Área principal</Text>
          <RNPickerSelect
            onValueChange={area =>
              setProjectInfo({
                ...projectInfo,
                area
              })
            }
            style={pickerStyles}
            items={[
              { label: 'Educación', value: Area.education },
              { label: 'Medio Ambiente', value: Area.ambient },
              { label: 'Salud', value: Area.salud }
            ]}
          />
          <Text style={styles.label}>Objetivo principal</Text>
          <RNPickerSelect
            onValueChange={objective =>
              setProjectInfo({
                ...projectInfo,
                objective
              })
            }
            style={pickerStyles}
            items={[
              { label: 'Crecimiento rápido', value: Objective.crecimiento },
              { label: 'Impacto social', value: Objective.social },
              {
                label: 'Rentabilidad a largo plazo',
                value: Objective.rentabilidad
              }
            ]}
          />
          <Text style={styles.label}>Recursos disponibles</Text>
          <RNPickerSelect
            onValueChange={resources =>
              setProjectInfo({
                ...projectInfo,
                resources
              })
            }
            style={pickerStyles}
            items={[
              {
                label: 'Financiamiento propio',
                value: Resource.financiamiento
              },
              { label: 'Tiempo libre', value: Resource.tiempo },
              { label: 'Red de contactos', value: Resource.contactos }
            ]}
          />
          <Pressable
            style={styles.btn}
            onPress={handleSaveData}
            accessibilityLabel="Create new project button"
          >
            <Text style={styles.btnText}>Empezar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screenContainer,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    ...globalStyles.title,
    marginBottom: 40
  },
  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },
  btn: {
    ...formGlobalStyles.btnPrimary,
    marginTop: 32
  },
  btnText: {
    ...formGlobalStyles.btnPrimaryText
  },
  label: {
    marginTop: 24
  }
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30
  }
});
