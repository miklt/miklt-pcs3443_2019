"""empty message

Revision ID: 63dcc94198bb
Revises: 7974745a61f8
Create Date: 2019-06-08 19:58:53.519670

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63dcc94198bb'
down_revision = '7974745a61f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('alunos', sa.Column('concluiu_teoria', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('alunos', 'concluiu_teoria')
    # ### end Alembic commands ###
