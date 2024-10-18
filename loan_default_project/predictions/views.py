import pickle
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os

# Get the absolute path to the pickle file
pickle_file_path = os.path.join(os.path.dirname(__file__), 'loan_default_model_scaler.pkl')

# Load the saved model and scaler from the pickle file
with open(pickle_file_path, 'rb') as f:
    model_scaler_data = pickle.load(f)

model = model_scaler_data['model']
scaler = model_scaler_data['scaler']

# Define a threshold for approving or denying the loan
DEFAULT_THRESHOLD = 0.5

# Function to handle the prediction request
@csrf_exempt
def predict_default(request):
    if request.method == 'POST':
        try:
            # Parse the input data from JSON
            data = json.loads(request.body)
            
            # Extract the features from the input
            features = [
                data['credit_lines_outstanding'],
                data['loan_amt_outstanding'],
                data['total_debt_outstanding'],
                data['income'],
                data['years_employed'],
                data['fico_score']
            ]
            
            # Scale the input features
            features_scaled = scaler.transform([features])
            
            # Make prediction using the logistic regression model
            pd = model.predict_proba(features_scaled)[0, 1]
            
            # Compare the probability of default to the threshold
            loan_decision = 1 if pd < DEFAULT_THRESHOLD else 0  # 1 = Approve, 0 = Deny
            
            # Return the loan decision as JSON
            return JsonResponse({
                'loan_decision': loan_decision
            })

        except KeyError as e:
            # Return error if any required field is missing
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)

        except Exception as e:
            # Catch all other exceptions and return as JSON
            return JsonResponse({'error': str(e)}, status=500)

    # Return error if the request is not POST
    return JsonResponse({'error': 'Invalid request method, POST expected'}, status=405)
