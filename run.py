from validation import app
import os

# Setting secrte_key (Developpement)
app.secret_key = os.environ.get('Key')

# Must be set/changed on Production Mode
if __name__ == "__main__":
    app.run(debug=True)