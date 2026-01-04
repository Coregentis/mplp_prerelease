import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'src'))

from uuid import uuid4
from datetime import datetime, timezone
from mplp.models.core import Context, Plan, PlanStep, MAPSession, MAPParticipant
from mplp.models.common import Metadata
from mplp.runtime.sa_profile import validate_sa_profile
from mplp.coordination.map_profile import validate_map_profile

def get_meta():
    return Metadata(
        protocol_version="1.0.0",
        schema_version="1.0.0",
        frozen=True,
        governance="MPGC",
        layer="Tools"
    )

def run_test():
    print("Running SA Profile Test...")
    try:
        context_id = uuid4()
        context = Context(
            meta=get_meta(),
            context_id=context_id,
            root={},
            title="Test Context",
            status="active"
        )
        
        plan = Plan(
            meta=get_meta(),
            plan_id=uuid4(),
            context_id=context_id,
            title="Test Plan",
            objective="Test",
            status="pending",
            steps=[
                PlanStep(step_id=uuid4(), description="Step 1", agent_role="coder")
            ]
        )
        
        result = validate_sa_profile(context, plan)
        print(f"SA Result: {result}")
    except Exception as e:
        print(f"SA Test Failed with Exception: {e}")
        import traceback
        traceback.print_exc()

    print("\nRunning MAP Profile Test...")
    try:
        session = MAPSession(
            collab_id=uuid4(),
            mode="orchestrated",
            status="draft",
            created_at=datetime.now(timezone.utc),
            participants=[
                MAPParticipant(participant_id="p1", role_id=uuid4(), kind="agent"),
                MAPParticipant(participant_id="p2", role_id=uuid4(), kind="agent")
            ]
        )
        
        result = validate_map_profile(session)
        print(f"MAP Result: {result}")
    except Exception as e:
        print(f"MAP Test Failed with Exception: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    with open("debug_output.txt", "w") as f:
        sys.stdout = f
        sys.stderr = f
        run_test()
