import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Sample data
data = {
    'description': ['Groceries', 'Electricity Bill', 'Rent', 'Internet'],
    'amount': [50, 75, 1200, 60]
}

df = pd.DataFrame(data)

# Feature Engineering
df['description_length'] = df['description'].apply(len)

# Model Training
X = df[['description_length']]
y = df['amount']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'expense_model.pkl')
