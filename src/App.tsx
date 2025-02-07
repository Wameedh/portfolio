
import React, { Suspense } from 'react';
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPageContainer from './containers/MainPageContainer';
import Navigation from './components/common/Navigation';
import ArticlesPage from './components/articles/ArticlesPage';
import { articles } from './data/articles';
import { ThemeProvider } from './components/common/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MainPageContainer />} />
              <Route path="/articles" element={<ArticlesPage articles={articles} />} />
              {articles.map(({ metadata, component: Component }) => (
                <Route
                  key={metadata.slug}
                  path={`/articles/${metadata.slug}`}
                  element={<Component />}
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;