import matplotlib.pyplot as plt
from qiskit import QuantumCircuit, QuantumRegister
from qiskit.circuit.library import MCMTGate as MCMT, RYGate
import numpy as np

# --- 1. Define the Registers ---
# n=3 for the System, m=5 for the History, k=1 for the Kick
S = QuantumRegister(3, name='S (System)')
H = QuantumRegister(5, name='H (History)')
K = QuantumRegister(1, name='K (Kick)')
qc = QuantumCircuit(S, H, K)

# --- 2. Define the Custom Gates ---
# The "Pull" Operator (Attractor Gate C)
# A simple but non-trivial unitary to represent the attractor dynamic.
# This one is a Toffoli gate with an H on the target, bracketed by X-gates.
attractor_logic = QuantumCircuit(3)
attractor_logic.x([0, 1, 2])
attractor_logic.h(2)
attractor_logic.mcx([0, 1], 2)
attractor_logic.h(2)
attractor_logic.x([0, 1, 2])
AttractorGate = attractor_logic.to_gate(label='Attractor (ℭ)')

# The "Kick" Operator (Perturbation V)
# A small Y-rotation.
kick_theta = 0.2 * np.pi
KickGate = MCMT(RYGate(theta=kick_theta), num_ctrl_qubits=1, num_target_qubits=3,
                ctrl_state=1, label="Kick")
KickGate_inv = KickGate.inverse()


# --- 3. Build the Circuit Step-by-Step ---
num_steps = 5
for k in range(num_steps):
    # a. Prepare the Kick
    qc.h(K)

    # b. Apply the Kick (Controlled-V)
    qc.append(KickGate, [K[0], S[0], S[1], S[2]])

    # c. Record the History
    qc.cx(K, H[k])

    # d. Apply the Pull (Attractor)
    qc.append(AttractorGate, [S[0], S[1], S[2]])

    # e. Reset the Kick (Uncomputation)
    qc.cx(K, H[k])
    qc.append(KickGate_inv, [K[0], S[0], S[1], S[2]])
    qc.h(K)

    # Add a barrier for visual separation
    if k < num_steps - 1:
        qc.barrier()

# --- 4. Generate the Image ---
# Use matplotlib for high-quality output
style = {'figwidth': 25, 'fontsize': 10}
qc.draw(output='mpl', style=style, fold=-1)

# Save the plot to a file
plt.savefig('quantum_circuit_diagram.png', dpi=300)

print("Quantum circuit diagram saved to 'quantum_circuit_diagram.png'")
