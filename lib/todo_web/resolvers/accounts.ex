defmodule TodoWeb.Resolvers.Accounts do
  alias Todo.Accounts

  def list_users(_args, _context) do
    {:ok, Accounts.list_users()}
  end

  def create_user(_parent, args, _context) do
    Accounts.create_user(args)
  end
end
