using SSS.Backend.Application.DTOs;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Application.Services;

public class StudentService : IStudentService
{
    public Task<StudentDTO> GetStudent(Guid id)
    {
        return Task.FromResult(new StudentDTO { Id = id });
    }

    public Task<IEnumerable<StudentDTO>> GetStudents()
    {
        return Task.FromResult<IEnumerable<StudentDTO>>(new List<StudentDTO>());
    }
}