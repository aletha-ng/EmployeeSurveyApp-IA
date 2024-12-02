import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  // Create a new page
  const handleCreatePage = () => {
    const newPageNumber = pages.length + 1;
    setPages([...pages, newPageNumber]);
    setCurrentPage(newPageNumber);  // Navigate to the new page by setting the current page
  };

  // Render the page content dynamically
  const renderPage = () => {
    if (currentPage === null) {
      return (
        <View style={styles.container}>
          <Text>Welcome to the Survey App!</Text>
          <Button title="Create New Survey Page" onPress={handleCreatePage} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>This is Survey Page {currentPage}</Text>
          <Button title="Back to Home" onPress={() => setCurrentPage(null)} />
        </View>
      );
    }
  };

  return <>{renderPage()}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
