"""create test migration table

Revision ID: 9d447c726c99
Revises: 
Create Date: 2023-06-20 11:12:59.226632

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d447c726c99'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "test",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("test_string", sa.String(50), nullable=True),
    )


def downgrade() -> None:
    op.drop_table("test")
