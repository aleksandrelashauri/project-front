import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  movieContainer: {
    display: "flex",
  },
});

export function PdfDocument(props) {
  return (
    <Document>
      <Page style={styles.page}>
        {props.data
          ? props.data.map(
              ({
                birthday,
                city,
                english,
                experience,
                firstName,
                image,
                lastName,
                mail,
                nativeLanguage,
                phone,
              }) => {
                return (
                  <View style={styles.movieContainer}>
                    <Image style={styles.image} source={`${image.data}.jpg`} />
                    <View>
                      <Text>{firstName}</Text>
                    </View>
                    <View>
                      <Text>{lastName}</Text>
                    </View>
                    <Text>Dato of birth :{birthday}</Text>
                    <View>
                      <Text>phone: {phone}</Text>
                    </View>
                    <View>
                      <Text>mail : {mail}</Text>
                    </View>
                    <View>
                      <Text>English level : {english}</Text>
                    </View>
                    <View>
                      <Text>City : {city}</Text>
                    </View>

                    <View>
                      <Text>native language : {nativeLanguage}</Text>
                    </View>
                    <View>
                      <Text>past experience : {experience}</Text>
                    </View>
                  </View>
                );
              }
            )
          : ""}
      </Page>
    </Document>
  );
}
